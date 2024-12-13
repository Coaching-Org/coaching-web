import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordQuery } from "@/hooks/query/auth/auth.query";

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least \n 1 symbol, \n 1 number, \n 1 uppercase, \n 1 lowercase, \n and be at least 8 characters long.",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const useChangePasswordUtils = ({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userEmail } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    watch,
    setValue,
    register,
    reset,
    formState: { errors },
  } = form;

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const { mutateAsync: changePassword } = useResetPasswordQuery();

  const onSubmitChangePassword = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (userEmail) {
        changePassword({
          email: userEmail,
          newPassword: data.password,
        })
          .then(() => {
            toast({
              title: "Password changed successfully",
              variant: "success",
            });
            reset();
            onOpenChange(false);
          })
          .catch((err) => {
            toast({
              title: "Failed to change password",
              variant: "destructive",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      toast({
        title: "Failed to change password",
        variant: "destructive",
      });
    }
  };

  const isDisabled = passwordValue !== confirmPasswordValue;

  return {
    state: {
      form,
      isLoading,
      errors,
      isDisabled,
      showPassword,
      showConfirmPassword,
    },
    event: {
      onSubmitChangePassword,
      register,
      setShowPassword,
      setShowConfirmPassword,
    },
  };
};

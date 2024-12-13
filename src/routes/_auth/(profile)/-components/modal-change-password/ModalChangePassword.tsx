import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useChangePasswordUtils } from "./change-password.utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export function ModalChangePassword({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    state: {
      form,
      errors,
      isDisabled,
      isLoading,
      showPassword,
      showConfirmPassword,
    },
    event: {
      onSubmitChangePassword,
      register,
      setShowPassword,
      setShowConfirmPassword,
    },
  } = useChangePasswordUtils({ onOpenChange });

  return (
    isOpen && (
      <div className="w-[600px]">
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <Form {...form}>
            <form>
              <DialogContent className="w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">Change Password</DialogTitle>
                </DialogHeader>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="flex flex-col text-sm">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...register("password")}
                              {...field}
                              placeholder="Password"
                              type={showPassword ? "text" : "password"}
                            />
                            <Button
                              onClick={() => setShowPassword(!showPassword)}
                              variant={"ghost"}
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              size={"sm"}
                              type="button"
                            >
                              {showPassword ? (
                                <Eye size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="flex flex-col text-sm mt-4">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...register("confirmPassword")}
                              {...field}
                              placeholder="Confirm Password"
                              type={showConfirmPassword ? "text" : "password"}
                            />
                            <Button
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              variant={"ghost"}
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              size={"sm"}
                              type="button"
                            >
                              {showConfirmPassword ? (
                                <Eye size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isDisabled || isLoading}
                    onClick={form.handleSubmit((data) => {
                      onSubmitChangePassword(data);
                    })}
                  >
                    Save Password
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Form>
        </Dialog>
      </div>
    )
  );
}

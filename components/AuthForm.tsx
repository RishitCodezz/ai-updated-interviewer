"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,      
  GoogleAuthProvider,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      if (!idToken || !user.email) {
        toast.error("Google sign in failed. Could not retrieve token.");
        return;
      }

      // We use the existing server action to establish the session
      await signIn({
        email: user.email,
        idToken,
      });

      toast.success("Signed in successfully with Google.");
      router.push("/");

    } catch (error: any) {
      console.error(error);
      // Handle "Popup closed by user" gracefully
      if (error.code === 'auth/popup-closed-by-user') return;
      toast.error(`Google Sign In failed: ${error.message}`);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px] animate-scale-in">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center animate-slide-up">
          <Image src="/logo.svg" alt="logo" height={32} width={38} className="transition-transform hover:scale-110 hover:rotate-12" />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3 className="animate-slide-up" style={{ animationDelay: '100ms' }}>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form animate-slide-up"
            style={{ animationDelay: '200ms' }}
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn hover:scale-105 transition-transform" type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Loading..." : isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

<div className="relative flex py-2 items-center animate-slide-up" style={{ animationDelay: '250ms' }}>
            <div className="flex-grow border-t border-gray-600/50"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Or continue with</span>
            <div className="flex-grow border-t border-gray-600/50"></div>
        </div>

        {/* --- NEW: Google Button --- */}
        <Button 
          type="button" // Important: prevents form submission
          variant="outline" 
          onClick={handleGoogleSignIn}
          className="w-full animate-slide-up gap-2 hover:bg-gray-800/50 hover:text-white border-gray-600 bg-transparent text-gray-300"
          style={{ animationDelay: '300ms' }}
        >
          {/* Inline SVG for Google Logo to avoid missing assets */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
            <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
            <path d="M5.50253 14.3003C5.00236 12.8199 5.00236 11.1799 5.50253 9.69967V6.60879H1.51649C-0.18551 10.0056 -0.18551 13.9945 1.51649 17.3913L5.50253 14.3003Z" fill="#FBBC05"/>
            <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.0344664 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.60879L5.50264 9.69967C6.45505 6.8601 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <p className="text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1 transition-colors hover:text-primary-200"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

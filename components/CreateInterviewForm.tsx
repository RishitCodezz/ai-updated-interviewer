"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  role: z.string().min(2, "Role is required"),
  level: z.string().min(1, "Level is required"),
  techstack: z.string().min(2, "Tech stack is required"),
  type: z.string().min(1, "Type is required"), // Technical, Behavioral, Mixed
  amount: z.coerce.number().min(1).max(10),
});

interface CreateInterviewFormProps {
  userId: string;
}

const CreateInterviewForm = ({ userId }: CreateInterviewFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      level: "",
      techstack: "",
      type: "Technical",
      amount: 3,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userid: userId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Interview generated successfully!");
        // Redirect to dashboard where the new card will appear
        router.push("/");
      } else {
        toast.error("Failed to generate interview. Please try again.");
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 card-border bg-dark-200/50 rounded-2xl animate-slide-up">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create New Interview
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Role</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Frontend Developer"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Junior, 2 years"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techstack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stack (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. React, Node.js, TypeScript"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interview Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Technical, Behavioral"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full btn-primary mt-4 hover:scale-105 transition-transform"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Generating..."
              : "Generate Interview"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateInterviewForm;

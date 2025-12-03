import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import CreateInterviewForm from "@/components/CreateInterviewForm";

const CreateInterviewPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <section className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center animate-fade-in">
      <CreateInterviewForm userId={user.id} />
    </section>
  );
};

export default CreateInterviewPage;

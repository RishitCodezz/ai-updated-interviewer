import Image from "next/image";

import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const AssistantPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="animate-fade-in">
      <div className="flex flex-row gap-4 justify-between items-center max-sm:flex-col animate-slide-up">
        <div className="flex flex-row gap-4 items-center">
          <Image
            src="/robot.png"
            alt="assistant"
            width={40}
            height={40}
            className="rounded-full object-cover size-[40px] transition-transform hover:scale-110 hover:rotate-12"
          />
          <h3>Your Personal Voice Assistant</h3>
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit transition-all hover:bg-dark-300">
          🎙️ Voice Conversation
        </p>
      </div>

      <div
        className="flex flex-col h-[80vh] gap-6 text-center max-w-2xl mx-auto mt-8 animate-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary-100 to-primary-200 bg-clip-text text-transparent">
          Your AI Companion, Always Ready to Help
        </h2>

        <div className="flex flex-col gap-4">
          <p className="text-lg text-light-100">
            Meet your intelligent voice assistant - ready to chat, help, and
            support you with anything you need!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-dark-200 p-4 rounded-lg transition-all hover:bg-dark-300 hover:scale-105">
              <div className="text-2xl mb-2">💡</div>
              <h4 className="font-semibold mb-1">Get Quick Answers</h4>
              <p className="text-sm text-light-400">
                Ask anything - from general knowledge to specific advice
              </p>
            </div>

            <div className="bg-dark-200 p-4 rounded-lg transition-all hover:bg-dark-300 hover:scale-105">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold mb-1">Plan & Organize</h4>
              <p className="text-sm text-light-400">
                Help with tasks, schedules, and decision-making
              </p>
            </div>

            <div className="bg-dark-200 p-4 rounded-lg transition-all hover:bg-dark-300 hover:scale-105">
              <div className="text-2xl mb-2">💬</div>
              <h4 className="font-semibold mb-1">Natural Conversation</h4>
              <p className="text-sm text-light-400">
                Chat naturally like talking to a friend
              </p>
            </div>

            <div className="bg-dark-200 p-4 rounded-lg transition-all hover:bg-dark-300 hover:scale-105">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold mb-1">Brainstorm Ideas</h4>
              <p className="text-sm text-light-400">
                Get creative help and fresh perspectives
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="animate-slide-up h-[80vh]"
        style={{ animationDelay: "200ms" }}
      >
        <p className="text-sm text-light-400 mb-4">
          Click the{" "}
          <span className="text-success-100 font-semibold">
            &quot;Call&quot;
          </span>{" "}
          button below to start your voice conversation. Speak naturally and
          your assistant will understand and respond just like a real person!
        </p>
        <Agent userName={user?.name!} userId={user?.id} type="assistant" />
      </div>
    </div>
  );
};

export default AssistantPage;

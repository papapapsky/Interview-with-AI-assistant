import { useForm } from "react-hook-form";
import "./collectResume.css";
import { useContext } from "react";
import { mainContext } from "../../../../MainContext";
import { ResumeOptions } from "./ResumeOptions/ResumeOptions";
import { generateQuestionsPrompt, userResumePrompt } from "./resumePrompt";

interface CollectResumeProps {
  setResumeText: (text: string) => void;
}

export type TypeFormInput = {
  name: string;
  experience: string;
  techStack: string;
  age: string;
  education: string;
  petProjects: string;
  direction: string;
};

export const CollectResume = ({ setResumeText }: CollectResumeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormInput>();

  const context = useContext(mainContext);
  if (!context) {
    throw new Error("error");
  }

  const [state] = context;

  const onSubmit = (data: TypeFormInput) => {
    const userResume = userResumePrompt({
      name: data.name,
      direction: data.direction,
      age: data.age,
      education: data.education,
      experience: data.experience,
      techStack: data.techStack,
      petProjects: data.petProjects,
    });
    const sentText = generateQuestionsPrompt({
      language: state.language,
      userResume: userResume,
      questionsQuantity: state.questionsQuantity,
    });

    localStorage.setItem("userResume", userResume);
    setResumeText(sentText);
  };

  return (
    <ResumeOptions
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

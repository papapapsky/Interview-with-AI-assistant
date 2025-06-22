import { useForm } from "react-hook-form";
import "./collectResume.css";
import { useContext } from "react";
import { mainContext } from "../../../../MainContext";
import { ResumeOptions } from "./ResumeOptions/ResumeOptions";

interface CollectResumeProps {
  setResumeText: (text: string) => void;
}

export type TypeFormInput = {
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
    const userResume = `Hi, im a ${data.direction} developer, im a ${data.age} years old. I have ${data.education} education and ${data.experience} years experience. My stack: ${data.techStack}. This is my pet-projects: ${data.petProjects}.`;
    const sentText = `PLEASE, ANSWER ON ${state.language}. ${userResume} Please make me ${state.questionsQuantity} questions that are asked at an interview for a programmer position in this form. WRITE ONLY QUESTIONS Something like this: 
    {"qustion1":"question","qustion2":"question"}. 

    WITHOUT TRIPLE QUOTES
    Write only a questions.`;

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

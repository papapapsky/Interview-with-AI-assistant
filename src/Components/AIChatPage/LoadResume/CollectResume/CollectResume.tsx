import { useForm } from "react-hook-form";
import "./collectResume.css";
import { useContext } from "react";
import { mainContext } from "../../../../MainContext";

interface CollectResumeProps {
  setResumeText: (text: string) => void;
}

type TypeFormInput = {
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
    <div className="collectResume">
      <h3>Or collect your resume</h3>
      <form className="resumeOptions" onSubmit={handleSubmit(onSubmit)}>
        <div className="Options">
          <div>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                max="100"
                min="1"
                type="number"
                placeholder="Write your age"
                {...register("age", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="direction">Direction and position</label>
              <input
                id="direction"
                type="text"
                placeholder="*Frontend, middle *"
                {...register("direction", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="education">Education:</label>
              <input
                id="education"
                type="text"
                placeholder="Write what education you have"
                {...register("education", { required: true })}
              />
            </div>
            <label htmlFor="techStack">Technology stack:</label>
            <input
              id="techStack"
              type="text"
              placeholder="frameworks, libraries, programming languages..."
              {...register("techStack", {
                required: true,
              })}
            />
          </div>
          <div>
            <label htmlFor="experience">Experience:</label>
            <select
              id="experience"
              {...register("experience", { required: true })}
            >
              <option value="0 years">0 years</option>
              <option value="0-3 years">0-3 years</option>
              <option value="3-6 years">3-6 years</option>
              <option value="more than 6 years">more than 6 years</option>
            </select>
          </div>
          <div>
            <label htmlFor="petProjects">Pet-projects:</label>
            <textarea
              id="petProjects"
              placeholder="Your pet-projects (name, idea, functions etc.)."
              {...register("petProjects", { required: true })}
            />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        {errors.techStack || errors.experience ? (
          <h2 className="required">Please, write all fields!</h2>
        ) : null}
      </form>
    </div>
  );
};

import type { TypeFormInput } from "../CollectResume";
import type {
  FieldErrors,
  UseFormRegister,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

type TypeProps = {
  register: UseFormRegister<TypeFormInput>;
  handleSubmit: UseFormHandleSubmit<TypeFormInput>;
  errors: FieldErrors<TypeFormInput>;
  onSubmit: SubmitHandler<TypeFormInput>;
};

export const ResumeOptions = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
}: TypeProps) => {
  return (
    <div className="collectResume">
      <h3>Or collect your resume</h3>
      <form className="resumeOptions" onSubmit={handleSubmit(onSubmit)}>
        <div className="Options">
          <div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Write your name"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                max={100}
                min={1}
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
              {...register("techStack", { required: true })}
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
        {Object.keys(errors).length > 0 && (
          <h2 className="required">Please, write all fields!</h2>
        )}
      </form>
    </div>
  );
};

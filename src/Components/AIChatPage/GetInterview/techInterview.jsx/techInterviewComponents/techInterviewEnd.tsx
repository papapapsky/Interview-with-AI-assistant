interface IProps {
  questionsQuantity: number;
}

export const TechInterviewEnd = ({ questionsQuantity }: IProps) => {
  return <>{questionsQuantity > 3 && <div>end</div>}</>;
};

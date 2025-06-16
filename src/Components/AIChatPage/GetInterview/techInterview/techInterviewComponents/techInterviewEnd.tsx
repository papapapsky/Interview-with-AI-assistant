interface IProps {
  questionsQuantity: number;
}

export const InterviewEnd = ({ questionsQuantity }: IProps) => {
  return (
    <>
      {questionsQuantity > 3 && (
        <div>
          <h2>Congratulations! Interview is end</h2>
        </div>
      )}
    </>
  );
};

import "../../../../public/chatWitchAi.png";
import "../../../../public/speedWork.png";
import "../../../../public/simplicityWork.png";
import "../../../../public/technnologiesHR.png";

export const ServiceOptions = () => {
  return (
    <div className="inactive">
      <div className="serviceOptions">
        <div className="Option">
          <div>
            <h3 className="titles">Speed</h3>
            <h4>
              <span>Quickly start your first interview</span> - just upload your
              resume in txt or pdf format or take it online on the website!
              Smart HR will collect suitable questions and tasks for you
            </h4>
          </div>
          <img src="speedWork.png" alt="" />
        </div>
        <div className="Option">
          <div>
            <h3 className="titles">Simplicity</h3>
            <h4>
              <span>Easy for use</span> - a simple interface and chat will allow
              you to quickly get used to it and feel comfortable during the
              interview
            </h4>
          </div>
          <img src="simplicityWork.png" alt="" />
        </div>
        <div className="Option">
          <div>
            <h3 className="titles">Technologies</h3>
            <h4>
              <span>Fresh technologies</span> - we use the latest technologies
              for comfortable work of the site and users on it. The site has a
              smart and fast model of artificial intelligence - Google gemini Ai
            </h4>
          </div>
          <img src="technnologiesHR.png" alt="" />
        </div>
      </div>
    </div>
  );
};

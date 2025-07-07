import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 w-full max-w-4xl">
      <h4 className="text-sm mb-6 text-center">Terms and Conditions</h4>

      <div className="space-y-4 text-justify">
        <p>
          I confirm that I am an adult and physically fit to undergo driving training. I have voluntarily chosen to enroll in the training and have informed and obtained permission from my family members.
        </p>

        <p>
          In case of any damage caused to the academy’s car or to a third party during the training session conducted by me, I agree to take full responsibility for the loss. The academy's trainer or institution will not be held liable for any such incidents.
        </p>

        <p>
          Our institution is a privately owned enterprise that provides personal-use car driving training to adult citizens.
        </p>

        <p>
          Upon completion of the training, our institution will issue a certificate for informational purposes only. This certificate is not a substitute for a government-issued driving license. To obtain a license, students must appear for the RTO test separately.
        </p>

        <p>
          Our training services are strictly for personal-use car driving. We do not provide training for passenger transport, commercial use, or heavy vehicles.
        </p>

        <p>
          The training course spans 15 days. After this period, the session is considered complete and no extensions will be provided.
        </p>

        <p>
          It is mandatory for all students to follow the instructions of the trainer throughout the training. Any involvement in inappropriate or illegal activities will result in immediate termination of the training.
        </p>

        <p>
          Students are not permitted to drive any vehicle independently until they have completed at least 10 lessons at the academy. Any violations will be the sole responsibility of the student.
        </p>

        <h5 className="text-sm font-semibold mt-8 mb-2">Minimum Eligibility Criteria for Admission</h5>
        <ul className="list-disc list-inside space-y-1">
          <li>Age: Must be 18 years or older</li>
          <li>Education: Minimum qualification of 8th standard pass</li>
          <li>Vision: Must be able to differentiate between colors</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
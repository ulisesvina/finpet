import React from "react";
import { checkMissingUserFields } from "@/actions/auth-actions";

const HomePage = async () => {
  const missingFields = await checkMissingUserFields();

  return (
    <div>
      <h1>HomePage</h1>
      {missingFields.missing && (
        <div>
          <h2 className="text-4xl">Missing Fields</h2>
          <ul>
            {missingFields.fields?.bankId && <li>Bank ID</li>}
            {missingFields.fields?.occupation && <li>Occupation</li>}
            {missingFields.fields?.salary && <li>Salary</li>}
          </ul>
        </div>
      )}

    </div>
  );
};

export default HomePage;

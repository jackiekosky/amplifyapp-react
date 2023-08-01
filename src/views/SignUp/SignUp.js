import { Authenticator  } from "@aws-amplify/ui-react";

const formFields = {
    signUp: {
        'custom:shopworks_number': {
            label: 'ShopWorks Customer ID',
            placeholder: 'Enter your ShopWorks Customer ID',
            isRequired: true,
        }
    }
  };
  
const SignUp = () => {
  return (
    <Authenticator formFields={formFields}>

    </Authenticator>
  );
};

export default SignUp;
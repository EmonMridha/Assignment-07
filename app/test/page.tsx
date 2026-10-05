import { getCurrentUser } from "@/lib/auth/getCurrentUser";

const TestPage = async () => {
    const user = await getCurrentUser();

    return (
        <div>
            <h1>Auth Test</h1>

            <pre>
                Hello world Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem delectus odio cum saepe expedita illo dignissimos ipsa earum nihil placeat. Voluptatibus deleniti molestias praesentium accusamus asperiores at possimus nostrum neque?
            </pre>
        </div>
    );
};

export default TestPage;
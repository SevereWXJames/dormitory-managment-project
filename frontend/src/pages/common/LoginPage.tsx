import { CommonFrame } from "../../components/common/CommonFrame";
import { LoginForm } from "../../components/common/LoginForm";

export function LoginPage() {
	return (
		<>
			<CommonFrame commonFrameType="LOGIN"></CommonFrame>
			<main className="login-page">
				<h1>Log in</h1>
				<LoginForm />
			</main>
		</>
	)
}
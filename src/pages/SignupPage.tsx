import SignupForm from '@/features/auth/signup/SignupForm'

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col px-[24px] pt-[80px] pb-[80px]">
        <SignupForm />
      </div>
    </div>
  )
}

export default SignupPage

export type PhoneEditStep = 'default' | 'editing' | 'verifying' | 'verified'

export default function getPhoneButtonText(step: PhoneEditStep) {
  switch (step) {
    case 'default':
      return '변경'
    case 'editing':
      return '인증번호 받기'
    case 'verifying':
      return '재전송'
    case 'verified':
      return '재전송'
    default:
      return '변경'
  }
}

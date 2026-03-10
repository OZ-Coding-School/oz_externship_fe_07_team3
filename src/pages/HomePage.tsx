import { Link } from 'react-router'

function HomePage() {
  return (
    <div>
      HomePage
      <Link to="/test">
        <div className="bg-accent w-50 border border-gray-200 p-5 shadow-md">
          TestPage 이동
        </div>
      </Link>
    </div>
  )
}

export default HomePage

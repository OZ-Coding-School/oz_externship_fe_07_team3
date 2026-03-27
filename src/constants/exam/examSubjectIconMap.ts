import awsIcon from '@/assets/icons/exam/aws.png'
import cssIcon from '@/assets/icons/exam/css.png'
import databaseIcon from '@/assets/icons/exam/database.png'
import djangoIcon from '@/assets/icons/exam/django.png'
import fastApiIcon from '@/assets/icons/exam/fastapi.png'
import flaskIcon from '@/assets/icons/exam/flask.png'
import githubIcon from '@/assets/icons/exam/github.png'
import htmlIcon from '@/assets/icons/exam/html.png'
import javascriptIcon from '@/assets/icons/exam/javascript.png'
import nodeIcon from '@/assets/icons/exam/nodejs.png'
import pythonIcon from '@/assets/icons/exam/python.png'
import reactIcon from '@/assets/icons/exam/react.png'
import reactNativeIcon from '@/assets/icons/exam/reactnative.png'
import typeScriptIcon from '@/assets/icons/exam/typescript.png'

export const EXAM_SUBJECT_ICON_MAP = {
  CSS: cssIcon,
  ReactNative: reactNativeIcon,
  HTML: htmlIcon,
  JavaScript: javascriptIcon,
  Github: githubIcon,
  React: reactIcon,
  Node: nodeIcon,
  Database: databaseIcon,
  TypeScript: typeScriptIcon,
  AWS: awsIcon,
  Python: pythonIcon,
  Django: djangoIcon,
  FastAPI: fastApiIcon,
  Flask: flaskIcon,
} as const

export default {
  extends: ['@commitlint/config-conventional'],
  // feat: 커밋제목 (#이슈번호)
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*): (.+) \(#(\d+)\)$/,
      headerCorrespondence: ['type', 'subject', 'ticket'],
    },
  },
  rules: {
    // type은 항상 소문자
    'type-case': [2, 'always', 'lower-case'],

    // type은 정해진 목록 중 하나
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'remove',
        'hotfix',
        'deprecated',
        'design',
      ],
    ],

    // subject는 비워둘 수 없음
    'subject-empty': [2, 'never'],
    'subject-case': [0],

    // subject 끝 마침표 금지
    'subject-full-stop': [2, 'never', '.'],

    // 본문이 있으면 제목 다음 한 줄 띄우기
    'body-leading-blank': [1, 'always'],
  },
}

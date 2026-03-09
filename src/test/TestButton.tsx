import Button from '@/components/ui/button'

export default function TestButton() {
  return (
    <>
      <Button variant="fill" size="sm">
        fill
      </Button>
      <Button variant="ghost" size="md">
        ghost
      </Button>
      <Button variant="ghost" size="sm">
        ghost
      </Button>
      <Button variant="outline" size="md">
        outline
      </Button>
      <Button variant="outline" size="md" disabled>
        outline
      </Button>
      <Button variant="fill" size="full">
        가입하기
      </Button>
      <Button variant="fill" size="full" disabled>
        가입하기
      </Button>
      <Button variant="sidebarTab" size="sidebarTab">
        사이드바탭
      </Button>
      <Button variant="sidebarTab" size="sidebarTab" active>
        사이드바탭
      </Button>
      <Button variant="sidebarTab" size="sidebarTab" disabled>
        사이드바탭
      </Button>
    </>
  )
}

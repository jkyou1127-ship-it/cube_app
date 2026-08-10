# 🧊 큐브 연습

3x3 큐브 연습을 위한 모바일 우선 웹 앱입니다. 스크램블 생성, 터치 타이머, 기록/통계를 제공합니다.

## 시작하기

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

추가로 설치한 외부 런타임 패키지는 없습니다. React 19 + TypeScript + Vite 기본 구성만으로 구현했으며,
`localStorage`와 브라우저 `Notification` API 등 웹 표준 기능만 사용합니다.

## 폴더 구조

```
src/
  App.tsx, App.css        앱 셸(헤더/바텀내비/탭 전환), 전역 컴포넌트 스타일
  index.css                테마 CSS 변수 (라이트 기본 + 다크 모드)
  types.ts                 공용 타입 (Solve, Settings, TabKey)
  components/
    BottomNav.tsx           하단 탭 내비게이션
    Confetti.tsx             PB 갱신 축하 캔버스 컨페티
  lib/
    scramble.ts              WCA 표기법 랜덤 스크램블 생성기
    time.ts                  시간 포맷터
    stats.ts                 PB / Ao5 / Ao12 / 평균 / 스트릭 계산
    storage.ts                localStorage 저장/불러오기
    quotes.ts                동기부여 문구
    confetti.ts               캔버스 컨페티 애니메이션 엔진
    notifications.ts          로컬 알림 (권한 요청, 예약, 서비스워커)
  features/
    timer/TimerScreen.tsx     메인 타이머 화면
    records/
      RecordsScreen.tsx        기록/통계/목표·스트릭/알림 설정
      SolveRow.tsx              개별 솔브 기록 행 (+2/DNF/삭제)
public/
  sw.js                     알림 표시용 최소 서비스워커
  manifest.webmanifest      PWA 매니페스트
```

## 주요 기능

- **스크램블 생성기**: WCA 표기법(U/D/L/R/F/B + `'`/`2`)을 사용한 무작위 스크램블. 같은 면·같은 축 연속 방지 규칙 적용.
  (참고: 실제 WCA 대회는 랜덤 스테이트 스크램블러(TNoodle)를 사용합니다. 이 앱은 훨씬 가벼운 랜덤 무브 방식이라 완전히 동일하지는 않습니다.)
- **터치 타이머**: 화면을 터치 후 손을 떼면 시작, 다시 터치하면 정지. 실행 중에는 헤더/내비를 숨기고 숫자만 크게 표시.
- **기록/통계**: PB, Ao5, Ao12(WCA 방식 - 최고/최저 1개씩 제외 후 평균), 세션 평균, 솔브별 +2/DNF 페널티, 삭제.
- **목표 & 스트릭**: 하루 목표 솔빙 횟수 설정, 연속 달성일 계산, 🔥 아이콘 강조.
- **PB 컨페티**: 이전 최고 기록 경신 시 화면 전체 컨페티 애니메이션.
- **로컬 알림**: 지정 시간 리마인드(앱이 열려있는 동안 동작), 2일 이상 미접속 시 앱 재방문 환영 배너.
  브라우저가 완전히 닫힌 상태의 백그라운드 푸시는 별도 서버가 필요해 이 앱 범위에는 포함하지 않았습니다.
- **다크 모드**: 기본은 라이트 테마이며, 헤더의 토글 버튼으로 다크 모드 전환 가능.

## 데이터 저장

모든 기록/설정은 브라우저 `localStorage`에 저장됩니다(서버 없음). 브라우저 데이터를 지우면 기록도 함께 삭제됩니다.

# AI Daily 주간 학습자료 제작 표준 요구사항 명세서

이 문서는 새로운 대화(New Chat)나 서로 다른 AI 에이전트(Claude, GPT, Gemini 등)가 프로젝트를 이어받아도, 동일한 전문성과 일관된 품질로 **AI 심화 학습자료(AI Daily)**를 제작하고 GitHub Pages에 배포할 수 있도록 정의한 **공식 표준 가이드라인**이다.

---

## 1. 역할과 최종 목표

* **수행 역할:** 20년 이상의 실무 및 연구 경험을 가진 **Senior AI Research Engineer, Deep Learning Architect, PyTorch Source Code Instructor 및 의료영상 AI 개발 전문가**.
* **학습 대상자:** AI 모델 개발 경험이 있는 실무 엔지니어. 따라서 피상적인 API 사용법 나열을 지양하고 다음의 7단계 깊이로 설명해야 한다.
  $$\text{원리} \longrightarrow \text{수식} \longrightarrow \text{Tensor Shape 추적} \longrightarrow \text{네트워크 아키텍처} \longrightarrow \text{PyTorch 저수준 코드} \longrightarrow \text{의료 초음파 실전 응용} \longrightarrow \text{검증 및 디버깅}$$
* **최종 목표:** 학습자가 모델을 단순히 사용하는 수준을 넘어 **직접 커스텀 아키텍처를 설계·수정하고, Pretrained 가중치를 부분 이식하며, 학습 과정의 이상 징후를 원리적으로 디버깅하고, 고해상도 의료 초음파 AI 모델을 저지연 On-device로 배포**할 수 있는 최고급 개발 역량을 완성하는 것.
* **언어 및 표기:** 한국어를 기본으로 작성한다. 영문 기술 용어는 최초 등장 시 반드시 **Full Name, 한국어 의미, 실무적 기능**을 함께 명시한다.

---

## 2. GitHub 저장소 및 파일 체계

* **Repository:** `shinyab-v2/shinyab-v2.github.io`
* **기준 브랜치:** `main` (작업 전 반드시 최신 `origin/main` 확인)
* **학습 사이트 URL:** https://shinyab-v2.github.io/ai/
* **메인 인덱스:** `ai/index.html`
* **강좌 파일 명명 규칙:** `ai/YYYY-MM-DD-topic.html` (예: `ai/2026-09-08-detection-architecture.html`)
* **공통 스타일시트:** `ai/ai.css`
* **공통 자바스크립트:** `ai/lesson.js` (TOC 자동 생성, KaTeX 수식 렌더링, 텍스트 흐름 다이어그램 자동 변환 지원)

---

## 3. 마스터 커리큘럼 로드맵 (총 8주 / 40강)

> [!IMPORTANT]
> **현재 학습 진도 현황:**
> * **Week 1 (#01 ~ #05):** 학습 완료 및 시니어 수준 전면 개정 완료
> * **Week 2 #06:** 학습 완료 및 심화판(`2026-09-07-small-batch-normalization-deep.html`) 반영 완료
> * **향후 진행 방식:** 사용자가 매주 1회 평일 기준 5일치(#07부터 순차) 작성을 요청할 때마다 해당 주간 분량을 작성합니다.

| 주차 | 단계명 | 회차 및 주제 | 상태 |
| :--- | :--- | :--- | :---: |
| **Week 1** | **PyTorch 내부 엔진 & 저수준 연산 계약** | **#01** Tensor Strides, Im2col/GEMM, 고해상도 VRAM<br>**#02** Autograd C++ DAG 엔진, In-place 디버깅, Custom Function<br>**#03** nn.Module Internals, Parameter/Buffer, state_dict 직렬화<br>**#04** Forward Graph Tracing, torch.fx IR & ShapeProp<br>**#05** Residual Block 수정: Stride vs Dilation vs Projection | **완료 (개정완료)** |
| **Week 2** | **정규화 역학, 객체 검출 헤드 & 트랜스포머** | **#06** Small-Batch Normalization: BN, GroupNorm, SyncBN `[완료]`<br>**#07** Modern Detection Neck: FPN, PANet, BiFPN 다중 스케일<br>**#08** Detection Head & Assignment: Anchor-free, SimOTA, ATSS<br>**#09** Self-Attention & Multi-Head QKV Tensor Mechanics<br>**#10** Vision Transformer (ViT) Source Code 해부 | **#06 완료<br>#07~#10 차주 작성** |
| **Week 3** | **학습 디버깅, 가중치 전이 & C++ 커스텀 연산** | **#11** Training Debugging Lab: Activation/Gradient 소실·폭주 추적<br>**#12** Advanced Fine-tuning: Discriminative LR, Partial Freeze<br>**#13** Complex Loss Design: Focal, Generalized Dice, Boundary Loss<br>**#14** Custom C++/CUDA Operator 기초: Grid/Block/Thread 계층<br>**#15** PyTorch C++ Extension 빌드 및 수치 검증 | 대기 |
| **Week 4** | **논문 구현(Paper-to-Code) & 의료 초음파 모델** | **#16** Paper-to-Code: 수학 수식을 PyTorch 코드로 변환<br>**#17** Breast Ultrasound Detection Pipeline: B-mode 특화 파이프라인<br>**#18** Ultrasound Segmentation Backbone: U-Net++, nnU-Net 분석<br>**#19** Speckle Reduction & 음향 물리 기반 Data Augmentation<br>**#20** Multi-Center Domain Shift 극복 기법 (장비사 편차) | 대기 |
| **Week 5** | **임상 평가 지표, 오류 분석 & 데이터 누수 방지** | **#21** Medical AI Metrics: AUROC, PR-AUC, FROC, FP/image<br>**#22** Model Calibration: ECE와 Temperature Scaling<br>**#23** Systematic Error Analysis: 임상 위양성/위음성 분류 체계<br>**#24** Patient-level Split & Data Leakage 차단 원칙<br>**#25** Experiment Tracking & Deterministic Reproducibility | 대기 |
| **Week 6** | **극소 병변 검출 전략, 클래스 불균형 & 해석성** | **#26** Small Lesion Detection: P2 Pyramid 추가 및 High-res 보존<br>**#27** Extreme Class Imbalance: Hard Negative Mining, Asymmetric Loss<br>**#28** Model Interpretability: Grad-CAM, Score-CAM 시각화<br>**#29** Shortcut Learning 진단: 기기 마커 및 주석 텍스트 편향 제거<br>**#30** Comprehensive Project Review: 1차 아키텍처 감사 | 대기 |
| **Week 7** | **대규모 분산 학습, 고성능 파이프라인 & 프로파일링** | **#31** High-Performance Data Pipeline: Zero-copy, RAM Disk, Prefetch<br>**#32** Training Loop from Scratch: Multi-stage Warmup, EMA<br>**#33** Mixed Precision Deep Dive: FP16 vs BF16, GradScaler 원리<br>**#34** Distributed Training (DDP): Process Group, Ring All-Reduce<br>**#35** GPU Memory Profiler: Profiler, Activation Checkpointing | 대기 |
| **Week 8** | **온디바이스 에지 배포 (ONNX/TensorRT) & 캡스톤** | **#36** PyTorch to ONNX Graph Export: Dynamic Axes, Symbolic Shape<br>**#37** ONNX Graph Surgeon: Node Pruning, Layer Fusion<br>**#38** TensorRT Engine 빌드: FP16/INT8 Calibration 최적화<br>**#39** On-device Edge Latency Optimization: CUDA Stream 비동기 추론<br>**#40** End-to-End Capstone Lab: 실시간 초음파 AI 파이프라인 완성 | 대기 |

---

## 4. 강좌 제작 시 필수 포함 항목 (16대 요소)

각 강좌는 독자가 최소 30~60분 이상 깊이 있게 학습할 수 있도록 다음 16가지 요소를 빠짐없이 포함해야 한다.

1. **학습 목표와 선수지식:** 이번 회차를 통해 획득하는 실질적인 엔지니어링 역량.
2. **주요 기술 용어 정의:** 영문 Full Name, 한국어 의미, 실무적 기능 테이블 제공.
3. **개념이 필요한 이유와 실제 문제 상황:** 이론 나열이 아닌, 현실적인 엔지니어링 병목(VRAM OOM, 지연시간, Gradient 소실 등) 제시.
4. **네트워크/알고리즘 내부 작동 원리:** 저수준 메모리 및 C++ 실행 메커니즘 설명.
5. **수식과 단계별 수치 계산:** 기호 정의와 구체적 숫자를 대입한 계산 과정 증명.
6. **Tensor Shape 변화 추적:** `[B, C, H, W]` 차원의 변화를 모든 주요 레이어마다 추적.
7. **반응형 Inline SVG 다이어그램:** 구조도, 데이터 흐름, 메모리 레이아웃을 시각화.
8. **실행 가능한 PyTorch 실습 코드:** `assert` 검증문이 포함된 실제 동작 코드.
9. **실제 라이브러리 코드와 단순화 예제의 차이:** 실무 프로덕션 레벨에서의 고려사항.
10. **Pretrained Weight 및 Fine-tuning 영향:** 구조 변경 시 가중치 재사용 가능 여부 분석.
11. **의료 초음파 AI 실제 적용 사례:** B-mode, Grayscale, Speckle, 소형 병변 등 도메인 특화 예시.
12. **흔히 발생하는 실수와 디버깅 방법:** 실무 에러 메시지와 해결 방법 (`_version`, In-place 등).
13. **성능·메모리·속도 Trade-off 분석:** FLOPs, Latency, VRAM Footprint 비교표.
14. **실습 과제:** 학습자가 직접 코드를 수정해볼 수 있는 챌린지.
15. **복습 문제 5개와 상세 해설:** 개념 검증을 위한 5문항의 퀴즈와 정답/해설.
16. **공식 문서 및 소스코드 링크:** PyTorch 공식 Docs 및 GitHub C++ 소스 링크.

---

## 5. 그림 및 시각화(SVG) 작성 원칙

1. **반응형 Inline SVG 필수 사용:** 외부 이미지 링크 대신 `<svg viewBox="..." ...>` 형태의 인라인 SVG를 본문에 직접 삽입한다.
2. **모바일 가독성 확보:** 모바일 화면에서 텍스트가 짤리지 않도록 적절한 폰트 크기(`font-size: 14~20`)와 패딩을 유지한다.
3. **수학적·구조적 정확성:** 텍스트 설명의 숫자(채널 수, 해상도, 스트라이드)와 SVG 다이어그램 상의 숫자가 100% 일치해야 한다.
4. **채팅 사전 검토 예외:** 사용자가 "채팅에서 먼저 그림을 검토하겠다"고 한 경우를 제외하고는 강좌 HTML 파일 내에 포함하여 배포한다.

---

## 6. 최근 핵심 학습 개념 및 주의사항

* **Stride / Dilation / Receptive Field:**
  * 입력 $640 \times 640$, 누적 Stride=8이면 Feature Map은 $80 \times 80$.
  * 원본의 $16 \times 16$ 픽셀 소형 병변은 Stride=8에서 약 $2 \times 2$ 셀에 불과하며, Stride=32에서는 정보가 심각하게 소실됨.
  * P2/P3/P4/P5 관례: P2=Stride 4, P3=Stride 8, P4=Stride 16, P5=Stride 32.
  * Dilation은 해상도를 높이는 것이 아니라 동일 가중치 수로 Receptive Field(수용 영역)를 확장하는 기법임 (Gridding artifact 유의).
* **Pretrained Weight 구조 변경:**
  * Stride, Dilation, Padding 변경은 Conv 가중치 텐서 형상을 바꾸지 않지만, 피처의 의미적 정렬을 깨뜨리므로 상위 레이어의 점진적 Fine-tuning 필요.
  * `load_state_dict(strict=False)`는 Shape 불일치를 해결해주지 않음.
* **Batch Normalization (7대 원칙 준수):**
  * 미니배치 통계($\mu_B, \sigma_B^2$) vs 추론 시 지수이동평균(Running mean/var) 엄격 구분.
  * CNN에서는 채널별로 $(N, H, W)$ 축 전체를 합산하여 통계 계산.
  * 작은 배치($B \le 4$)에서는 통계 요동으로 학습 붕괴 위험 $\rightarrow$ GroupNorm 또는 SyncBN 도입.
  * `requires_grad=False`와 `model.eval()`의 차이: `requires_grad=False`여도 `train()` 모드면 running stats가 계속 갱신됨. 반드시 `eval()`을 병행해야 고정됨.

---

## 7. AI 에이전트 작업 실행 절차 (Step-by-Step)

```text
[Step 1. 최신 main 확인] 
  git pull 또는 git status를 통해 현재 저장소의 최신 강좌 목록 및 index.html 상태 확인.
[Step 2. 주간 커리큘럼 매핑] 
  요청받은 주간의 5개 강좌 주제를 본 명세서의 마스터 커리큘럼에서 추출.
[Step 3. HTML 강좌 5개 작성] 
  ai/YYYY-MM-DD-topic.html 파일 생성. (ai.css, lesson.js, KaTeX, Inline SVG, 16대 요소 완비)
[Step 4. ai/index.html 동기화] 
  메인 페이지의 최근 강좌 카드 목록과 로드맵 상태 갱신.
[Step 5. 무결성 검증] 
  HTML 태그 닫힘, 수식 문법, PyTorch 코드 문법, SVG viewBox, 상호 링크 검증.
[Step 6. Git 커밋 및 푸시] 
  git add/commit/push origin main 수행. Commit SHA 확보.
[Step 7. 최종 결과 보고] 
  기간, 날짜별 강좌 제목, 생성 파일 목록, 실제 배포 URL, 커밋 SHA를 사용자에게 명확히 보고.
```

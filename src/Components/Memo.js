import React from "react";
import "./Memo.css";

class Memo extends React.Component {
  constructor(props) {
    super(props);
    this.targetId = "wrap";
  }

  //화면 표시 후 실행 이벤트
  componentDidMount() {
    this.init();
  }

  //화면에 표시
  render() {
    return (
      <>
        <ul className="memo_manual">
          <li>회색 화면 마우스 오른쪽 버튼 클릭 시 쪽지 생성</li>
          <li>쪽지 헤더 드래그하여 위치 이동</li>
          <li>쪽지 우측 아래 모서리 드래그하여 크기 변경</li>
          <li>X 버튼 클릭 시 삭제</li>
          <li>새로고침 시 현재 상태 localStorage에 저장</li>
          <li>화면 로딩 시 localStorage에서 쪽지 로드</li>
        </ul>
        <div className="memo_wrap" id={this.targetId}></div>
      </>
    );
  }

  //쪽지 초기화
  init() {
    const wrap = document.getElementById(this.targetId);

    //localStorage에 저장된 쪽지가 있으면 가져와서 생성
    //저장된 쪽지가 없으면 새 쪽지 생성
    const memosFromStorage = this.getInfoFromLocalStorage();
    if (memosFromStorage != null && memosFromStorage.length > 0) {
      for (const memo of memosFromStorage) {
        const { left, top, zIndex, width, height, innerHTML } = memo;
        this.create(wrap, left, top, zIndex, width, height, innerHTML);
      }
    } else {
      const zIndex = this.getMaxZIndex() + 1;
      this.create(wrap, "200px", "150px", zIndex, "200px", "100px");
    }

    //회색 화면에 마우스 오른쪽 버튼 클릭 시 쪽지 추가
    wrap.addEventListener("mousedown", event => this.clickRightButton(event));

    //드래그 시 드롭 가능 여부 표시 변경
    wrap.addEventListener("dragover", event => event.preventDefault());

    //마우스 우클릭 시 브라우저 기본 이벤트 방지
    document.addEventListener("contextmenu", event => event.preventDefault());

    //리로드 시 localStorage에 쪽지 저장
    window.addEventListener("beforeunload", this.setInfoToLocalStorage);

    /**
     * 20200304
     * 쪽지 생성 시 전체 쪽지 이벤트 바인딩 -> 쪽지 초기화 시 한번만 이벤트 바인딩(동적 바인딩 처리)
     * 쪽지 생성할 때마다 모든 쪽지 다시 이벤트 바인딩하는 방식이 비효율적이라고 생각하여 수정
     */
    //쪽지 위치 이동 관련 드래그 이벤트 처리
    document.addEventListener(
      "dragstart",
      event => event.target.className === "memo_header" && this.dragStart(event)
    );
    document.addEventListener(
      "dragend",
      event => event.target.className === "memo_header" && this.dragEnd(event)
    );

    //쪽지 textarea focus 시 맨 위 표시 처리
    document.addEventListener("focusin", event => {
      event.target.className === "memo_textarea" && this.focusOnTextarea(event);
    });

    //X 버튼 클릭 시 쪽지 닫기 이벤트 처리
    document.addEventListener("click", event => {
      event.target.className === "memo_btn_close" && this.remove(event);
    });

    //쪽지 사이즈 변경 이벤트 처리
    document.addEventListener(
      "mousedown",
      event =>
        event.target.className === "memo_btn_size" && this.resizeStart(event)
    );
  }

  //쪽지 삭제
  remove(event) {
    //id로 쪽지 찾아서 삭제
    const id = event.target.id.split(`_`)[2];
    document.getElementById(`memo_${id}`).remove();
  }

  //쪽지 생성, 관련 이벤트 설정
  create(wrap, x, y, zIndex, width, height, innerHTML = "") {
    //id 최대값 구하기
    const id = this.getMaxId() + 1;

    //쪽지 생성
    wrap.innerHTML += `<div class="memo" id="memo_${id}" style="z-index:${zIndex};top:${y};left:${x}">
        <div class="memo_header" draggable="true">
            <h1 class="memo_blind">메모장</h1>
            <button class="memo_btn_close" id="btn_close_${id}"><span class="memo_blind">닫기</span></button>
        </div>
        <div class="memo_content">
            <div class="memo_textarea" id="textarea_${id}" contenteditable="true" style="width:${width}; height:${height};">
            ${innerHTML}
            </div>
            <button class="memo_btn_size" id="btn_size_${id}">
            <span class="memo_blind">메모장 크기 조절</span>
            </button>
        </div>
        </div>`;

    // //관련 이벤트 설정
    // this.initMemoEvent();
  }

  //20200304, LDH, 쪽지 생성할 때마다 모든 쪽지 다시 이벤트 바인딩하는거 낭비라고 생각해서 동적 바인딩되게 수정
  // //쪽지 관련 이벤트 바인딩
  // initMemoEvent() {
  //   //쪽지 위치 이동 이벤트 바인딩
  //   this.bindEvent("memo_header", "dragstart", this.dragStart);
  //   this.bindEvent("memo_header", "dragend", this.dragEnd, this);

  //   //쪽지 수정 시 맨 위에 표시 이벤트 바인딩
  //   this.bindEvent("memo_textarea", "focus", this.focusOnTextarea, true);

  //   //쪽지 닫기 이벤트 바인딩
  //   this.bindEvent("memo_btn_close", "click", this.remove);

  //   //쪽지 크기 변경 이벤트 바인딩
  //   this.bindEvent("memo_btn_size", "mousedown", this.resizeStart, true);
  // }

  // //클래스명으로 element 순회 이벤트 바인딩 함수
  // bindEvent(className, eventName, func, isArgThis = false) {
  //   const elements = document.getElementsByClassName(className);
  //   for (const element of elements) {
  //     element.addEventListener(eventName, event => {
  //       if (isArgThis) {
  //         func(this, event);
  //       } else {
  //         func(event);
  //       }
  //     });
  //   }
  // }

  //textarea focus 시 맨 위 표시
  focusOnTextarea(event) {
    const id = event.target.id.split("_")[1];
    document.getElementById(`memo_${id}`).style.zIndex =
      this.getMaxZIndex() + 1;
  }

  //마우스 오른쪽 버튼 클릭 시 쪽지 생성
  clickRightButton(event) {
    const { button, which, clientX, clientY, target } = event;

    //마우스 오른쪽 버튼 클릭인지 확인
    if (target.id === this.targetId && (button === 2 || which === 3)) {
      //최대 zIndex 값 구해서 새 쪽지 생성
      const zIndex = this.getMaxZIndex() + 1;
      this.create(
        target,
        clientX + "px",
        clientY + "px",
        zIndex,
        "200px",
        "100px"
      );
    }
  }

  //드래그 시 쪽지 이미지 표시 변경
  //(이거 안하면 드래그 시 쪽지의 header 부분만 따라다님)
  dragStart(event) {
    const {
      dataTransfer,
      target: { parentElement }
    } = event;

    dataTransfer.setDragImage(parentElement, 0, 0);
  }

  //드래그앤 드랍 성공 시 위치 변경, 겹쳐진 쪽지 중 최상단 표시
  dragEnd(event) {
    const {
      clientX,
      clientY,
      target: {
        parentElement: { style }
      },
      dataTransfer: { dropEffect }
    } = event;

    //dropEffect 값으로 드랍 성공 여부 확인
    //쪽지 위치, 표시 우선순위 변경
    if (dropEffect === "move") {
      style.top = clientY + "px";
      style.left = clientX + "px";
      style.zIndex = this.getMaxZIndex() + 1;
    }
  }

  //크기 변경 버튼 클릭 시 실행 메소드
  resizeStart(event) {
    //마우스 왼쪽 클릭인지 확인
    const { which, button } = event;
    if (button === 0 && which === 1) {
      const id = event.target.id.split(`_`)[2];
      const resizeFunc = event => this.resize(event, id);

      //크기 변경 버튼 클릭한 상태에서 드래그 할 때에만 크기 변경되도록 이벤트 리스너 등록
      document.addEventListener("mousemove", resizeFunc);

      //마우스 버튼 떼면 이벤트 바인딩 해제
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resizeFunc);
      });
    }
  }

  //쪽지 크기 변경 메소드
  resize(event, id) {
    //크기 변경 여부 true 인지 확인
    //true 이면 textarea 크기 변경
    //쪽지 크기 = 마우스 커서 이동 좌표 - 쪽지 좌표
    const textarea = document.getElementById(`textarea_${id}`);
    const memo = document.getElementById(`memo_${id}`);
    const { clientX, clientY } = event;
    const { offsetLeft, offsetTop } = memo;

    textarea.style.width = clientX - offsetLeft + "px";
    textarea.style.height = clientY - offsetTop + "px";
  }

  //쪽지 ID 최대값 구하기
  getMaxId() {
    const memos = document.getElementsByClassName("memo");
    let maxId = 0;

    //전체 쪽지를 순회하며 id를 확인
    //maxId 보다 크면 maxId 값을 id 값으로 변경,
    //반복문 끝나면 maxId 값 return
    for (const memo of memos) {
      const id = Number(memo.id.split("_")[1]);
      if (maxId < id) {
        maxId = id;
      }
    }
    return maxId;
  }

  //쪽지 z-index 최대값 구하기
  getMaxZIndex() {
    const memos = document.getElementsByClassName("memo");
    let maxZIndex = 0;

    //전체 쪽지를 순회하며 zIndex 값 확인
    //maxZIndex 보다 크면 maxZIndex 값을 zIndex 값으로 변경,
    //반복문 끝나면 maxZIndex 값 return
    for (const memo of memos) {
      const zIndex = Number(memo.style.zIndex);
      if (maxZIndex < zIndex) {
        maxZIndex = zIndex;
      }
    }
    return maxZIndex;
  }

  //localStorage에 저장된 쪽지 가져오기
  getInfoFromLocalStorage() {
    //localStorage 하나의 Key에 저장된 여러 값 불러오는 경우 JSON.parse 사용
    return JSON.parse(localStorage.getItem("memo"));
  }

  //localStorage에 쪽지 저장
  setInfoToLocalStorage() {
    const memos = document.getElementsByClassName("memo");
    const arr = [];

    //전체 쪽지를 순회하며 각각의 속성을 객체 배열에 저장
    for (const memo of memos) {
      const id = memo.id.split("_")[1];
      const { top, left, zIndex } = memo.style;
      const {
        style: { width, height },
        innerHTML
      } = document.getElementById(`textarea_${id}`);

      const obj = {
        top,
        left,
        width,
        height,
        zIndex,
        innerHTML
      };
      arr.push(obj);
    }

    //localStorage에 여러 값 저장하기 위해 JSON.stringify 사용
    localStorage.setItem("memo", JSON.stringify(arr));
  }
}
export default Memo;

/**

 * 레이아웃상의 컴포넌트 정보를 속성창으로 전달하여 값을 보여주는 과정
   updateInfo -> getUpdateValue -> update_AxxComp
 
 * updateInfo 는 레이아웃에 배치된 컴포넌트를 선택하면 호출되고
   valueGroup(CSS_VALUE, ATTR_VALUE, ...) 에 따라 값이 갱신되어야 할 value component 들을 얻는다.
 
 * 이어서 valueComp 가 가지고 있는 dataKey(component id) 로, 
   selComp 로부터 valueComp 에 반영할 값을 추출(getUpdateValue)한다.
   마지막으로 valueComp 의 종류에 따라 update_AxxComp 계열의 함수를 분기하여 호출한다.

 -------------------------------------------------------------------------------------------------	

 * 속성창의 값을 레이아웃상의 컴포넌트에 셋팅하는 과정
   onAxxEvent -> applyValue -> applyValueToSelComp

 * onAxxEvent 함수는 속성창의 컨트롤(Value Component)의 값을 변경하면 호출된다.
   즉, 속성창에서 TextField 의 값을 변경하면 onTextValueChange 가 발생된다.
   applyValueToSelComp 가 호출되기 전에.. 전처리가 필요한 경우 override 한다.
  
 * applyValueToSelComp 함수는 valueGroup(CSS_VALUE, ATTR_VALUE, ...) 에 따라 selected component 의 상황에 맞는 함수를 호출하여 
   속성값을 selComp 에 셋팅해 준다. selComp에 따라 셋팅 방법이 달라지는 경우 이 함수를 override 한다.
   
 ---------------------------------------------------------------------------------------------------
 
 ★ 위의 내용은 전체적인 구조를 설명한 것이고 간단히 요약하면 ★ 
 
 기본적인 동작은 이미 구현되어져 있으므로...

 레이아웃상의 컴포넌트 정보를 속성창으로 보여주는 방식의 변경이 필요하면 
 getUpdateValue 함수를 재정의 하면 되고,

 속성창의 값을 레이아웃상의 컴포넌트에 셋팅하는 방식의 변경이 필요하면 
 applyValueToSelComp 함수를 재정의 하면 됩니다.

 */

class ASpacerAttrProp extends BaseProp
{
	constructor()
	{
		super();
	}

    init(context, evtListener)
    {
        super.init(context, evtListener);

        //	ASpacer 만의 추가적인 설정 화면을 제작합니다.
        //	프로젝트뷰에서 /afc/attribute/ASpacer 폴더에 
        //	MyInfo.lay 파일을 추가합니다.(파일명은 설정화면을 잘 표현하는 이름으로 셋팅합니다.)
        
        //	layout 파일이 존재하는 경로
        //var attrPath = 'Framework/afc/attribute/ASpacer/';
        
        //	첫번째 파라미터는 아코디언 메뉴 타이틀 이름입니다.
        //	두번째 파라미터는 설정화면을 구성할 layout 파일의 위치입니다.
        //this.acc.insertItem('My Info', attrPath + 'MyInfo.lay', null, null, true);
    }

//	속성창에 셋팅할 값을 selComp(레이아웃상의 선택된 컴포넌트) 로 부터 얻어오는 방식을 지정한다.
//	dataKey 는 Value Component(속성창의 정보를 입력한 컴포넌트) 의 아이디이고 css 의 프로퍼티(키값)가 된다.
//	기본동작은 selComp 의 정보를 얻어 값을 리턴한다.
/*
    getUpdateValue(selComp, dataKey, groupName)
    {
        //단일 선택인 경우만 값을 읽어와 셋팅한다.
        if(this.selCompArr.length==1)
        {
            if(groupName=='ATTR_VALUE')
            {
                if(dataKey=='placeholder' || dataKey =='readonly')
                {
                    return $(selComp.textfield).attr(dataKey);
                }
            }
            else if(groupName=='CSS_VALUE')
            {
                if(dataKey=='text-align')
                {
                    return $(selComp.textfield).css(dataKey);
                }
            }
        }
        
        return super.getUpdateValue(selComp, dataKey, groupName);	
    }
*/
// applyValueToSelComp 함수는 valueGroup(CSS_VALUE, ATTR_VALUE, ...) 에 따라 
// selComp(레이아웃상의 선택된 컴포넌트) 의 상황에 맞는 함수를 호출하여 속성값을 selComp 에 셋팅해 준다. 
// 기본 셋팅 방법을 변경해야 할 경우 이 함수를 override 한다. 
// 셋팅하기 전에 preVal 값을 저장해 놓고 리턴해 줘야 undo, redo 가 작동합니다.
/*
    applyValueToSelComp(selComp, dataKey, valueGroup, value)
    {
        var prevVal;
        var $selCompTxtField = $(selComp.textfield);
            
        if(valGroup=='ATTR_VALUE')
        {
            if(dataKey=='placeholder' || dataKey=='readonly')
            {
                prevVal = $selCompTxtField.attr(dataKey);
                
                if(value) $selCompTxtField.attr(dataKey, value);
                else $selCompTxtField.removeAttr(dataKey);
                
                return prevVal;
            }
        }
        
        else if(valGroup=='CSS_VALUE')
        {
            if(dataKey=='text-align')
            {			
                prevVal = $selCompTxtField.css(dataKey);
                $selCompTxtField.css(dataKey, value);
                return prevVal;
            }
        }
        
        return super.applyValueToSelComp(selComp, dataKey, valueGroup, value);
    }
*/
}
window.ASpacerAttrProp = ASpacerAttrProp;

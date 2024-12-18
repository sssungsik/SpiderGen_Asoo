
/**
Constructor
Do not call Function in Constructor.
*/
ACalendarPickerAttrProp = class ACalendarPickerAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = 'Framework/afc/attribute/ACalendarPicker/';
	
	

    }
}



ACalendarPickerAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');
    this.acc.insertItem('Option', this.attrPath+'Option.lay');
	
	//this.insertCommonAttr();
	//this.acc.insertItem('Display', BaseProp.ATTR_PATH + 'Common/Display.lay');
	//this.acc.insertItem('Background', BaseProp.ATTR_PATH + 'Common/Background.lay');
	//this.acc.insertItem('Font', BaseProp.ATTR_PATH + 'Common/Font.lay');
	//this.acc.insertItem('Padding', BaseProp.ATTR_PATH + 'Common/Padding.lay');
	//this.acc.insertItem('Border', BaseProp.ATTR_PATH + 'Common/Border.lay');
	//this.acc.insertItem('Layout', BaseProp.ATTR_PATH + 'Common/Layout.lay');
};

ACalendarPickerAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	var prevVal;

    if(dataKey=='data-option-focus-selection')
	{
        let inputEle = selComp.element.getElementsByTagName('input')[0];
		if(inputEle) 
        {
            inputEle.acomp.option['isFocusSelection'] = value;
        }
	}

	if(valGroup=='ATTR_VALUE')
	{
		if(['data-day-mode','data-format','data-from-year','data-to-year'].indexOf(dataKey)>-1)
		{
			if(value) selComp.$ele.attr(dataKey, value);
			var item = selComp.element.children[0].children[0].acomp;
			item.$ele.attr(dataKey, value);
			
			if(dataKey == 'data-day-mode') item.setMode(parseInt(value));
			if(dataKey == 'data-format') item.setFormat(value);
			item.initDate();
			
			return prevVal;
		}
		else
		{
			if(['readonly','disabled'].indexOf(dataKey)>-1)
			{
				var childItem = selComp.element.children[0].children[0].acomp.getChildren();
				for(var i=0; i<childItem.length; i++)
				{
					BaseProp.prototype.applyValueToSelComp.call(selComp, childItem[i], dataKey, valGroup, value);
				}
			}
		}
	}
	else if(valGroup=='CSS_VALUE')
	{
		var item = selComp.element.children[0].children[0].acomp;
		if(value) item.setTextFieldStyle(dataKey, value);
	}
	
	BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};

ACalendarPickerAttrProp.prototype.getUpdateValue = function(selComp, dataKey, groupName)
{
	var value = '';
		
	//단일 선택인 경우만 값을 읽어와 셋팅한다. 다중 선택인 경우는 값을 클리어 해준다.
	if(this.selCompArr.length==1)
	{
		//groupName 에 따라 얻어오는 방법 분기, selComp 는 AComponent 이다.
		switch(groupName)
		{
			case 'CSS_VALUE':
			{
				//background-color, color 등 컬러 값인 경우는 현재 보여지고 있는 색을 표현해야 하므로 css 함수를 사용한다.
				if(dataKey.indexOf('color')>-1) value = selComp.$ele.css(dataKey);
				//셋팅되어져 있지 않은 값들을 보여주지 않기 위해 값을 읽어올 때는 style 변수를 사용한다.
				else value = selComp.element.style[dataKey];
			}
			break;

			case 'ATTR_VALUE':
				if(['data-day-mode','data-format','data-from-year','data-to-year'].indexOf(dataKey)>-1)
					value = selComp.element.children[0].children[0].acomp.$ele.attr(dataKey);
					
				else
					value = selComp.$ele.attr(dataKey);
			break;

			case 'SET_VALUE':
				value = selComp['get'+dataKey]();
			break;

			//tag value 는 기본적으로 배열을 만든다.
			case 'TAG_VALUE':
			{
				value = [];
				selComp.$ele.children(dataKey).each(function()
				{
					value.push(this);
				});
			}
			break;
		}

		//if(value==undefined) value = '';
	}

	//valueComp 의 종류에 따라 셋팅 방법 분기
	//this['update'+valueComp.baseName](dataKey, valueComp, value);
	
	return value;
};
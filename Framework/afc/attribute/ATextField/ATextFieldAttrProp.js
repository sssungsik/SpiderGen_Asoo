
/**
Constructor
Do not call Function in Constructor.
*/
ATextFieldAttrProp = class ATextFieldAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ATextField/';
	
	

    }
}



ATextFieldAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');
	this.acc.insertItem('Option', this.attrPath+'Option.lay');

	//common
	this.insertCommonAttr();
};

/*
ATextFieldAttrProp.prototype.onTextValueChange = function(comp, info)
{
	var compId = comp.getComponentId();
	var view = theApp.getLayoutView();
	
	if(compId=='AttrValue')
	{
		this.applyValue(comp, info);
		if(view)
		{
			for(var i=0; i<this.selCompArr.length; i++)
			{
				var selComp = this.selCompArr[i];
				var id = selComp.getComponentId();
				view.getDocument().treeRename(selComp, id!=''?id:(selComp.getAttr(afc_.ATTR_CLASS) + ' "' + selComp.getText() + '"'));
			}
		}

		return;
	}
	
	BaseProp.prototype.onTextValueChange.call(this, comp, info);
};
*/

ATextFieldAttrProp.prototype.onSelectValueChange = function(comp, info)
{
	let compId = comp.getComponentId();
	
    //타입이 변경될 때마다 value 값을 초기화 해준다.
	if(compId=='type')
	{
        for(let i=0; i<this.selCompArr.length; i++)
		{
			this.selCompArr[i].setAttr('value', '')
		}
	}
	
	BaseProp.prototype.onSelectValueChange.call(this, comp, info);
};


ATextFieldAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	//BaseProp에서 dataKey가 data-option- 이 포함되면 뒷부분의 글자로 옵션이 자동으로 설정된다면 제거해도 됨
	//data-option-focus-selection : 'is' + Focus + Selection -> isFocusSelection 을 옵션에 저장
	//위처럼 처리되면 옵션을 설정할 때 컴포넌트에서 특별한 처리가 필요한 경우는 불가능하므로 다른 방법을 생각해봐야한다
	if(dataKey=='data-option-focus-selection')
	{
		selComp.option['isFocusSelection'] = value;
		//selComp.setOption({isFocusSelection: value});
	}
	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};

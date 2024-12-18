
/**
Constructor
Do not call Function in Constructor.
*/
ADropBoxAttrProp = class ADropBoxAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ADropBox/';
	
	

    }
}



ADropBoxAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	this.insertCommonAttr();
};


ADropBoxAttrProp.prototype.getUpdateValue = function(selComp, dataKey, groupName)
{
	//단일 선택인 경우만 값을 읽어와 셋팅한다. 다중 선택인 경우는 값을 클리어 해준다.
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

	return BaseProp.prototype.getUpdateValue.call(this, selComp, dataKey, groupName);	
};

ADropBoxAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
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

	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};



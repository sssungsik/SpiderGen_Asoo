
/**
Constructor
Do not call Function in Constructor.
*/
AGridAttrProp = class AGridAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AGrid/';
	
	

    }
}



AGridAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Option', this.attrPath+'Option.lay');
	//this.acc.insertItem('Style', this.attrPath+'Style.lay');

	//TODO:edit here
	this.insertCommonAttr();
};

AGridAttrProp.prototype.getUpdateValue = function(selComp, dataKey, groupName)
{
	/*
	//단일 선택인 경우만 값을 읽어와 셋팅한다. 다중 선택인 경우는 값을 클리어 해준다.
	if(this.selCompArr.length==1)
	{
		if(groupName=='ATTR_VALUE')
		{
			switch(dataKey)
			{
				case 'data-style-header': 
					return selComp.showThead.attr(dataKey);
					
				case 'data-style-body': 
					return selComp.tBody.attr(dataKey);
					
				//data-hide-header
			}
		}
	}
	*/
	if(this.selCompArr.length==1)
	{
		if(groupName=='ATTR_VALUE')
		{
			switch(dataKey)
			{
				case 'data-fullrow-select':
				{
					if(selComp.getAttr('data-clear-rowtmpl'))
					{
						this[dataKey].enable(true);
					}
					else
					{
						this[dataKey].enable(false);
						this[dataKey].setCheck(false);
						selComp.removeAttr(dataKey);
					}
				}
				break;
			}
		}
	}

	return BaseProp.prototype.getUpdateValue.call(this, selComp, dataKey, groupName);	
};

AGridAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	var prevVal;
	if(valGroup=='ATTR_VALUE')
	{
		switch(dataKey)
		{
			/*
			case 'data-style-header':
			{
				prevVal = selComp.showThead.attr(dataKey);
				this.applyStyleValue(dataKey, value, selComp.showThead);
				this.applyStyleValue(dataKey, value, selComp.hideThead);
			}
			return prevVal;
			
			case 'data-style-body':
			{
				prevVal = selComp.tBody.attr(dataKey);
				this.applyStyleValue(dataKey, value, selComp.tBody);
			}
			return prevVal;
			*/
			
			case 'data-hide-header':
			{
				if(value) selComp.hideHeader();
				else selComp.showHeader();
			}
			break;
			
			case 'data-hide-footer':
			{
				if(value) selComp.hideFooter();
				else selComp.showFooter();
			}
			break;
			//return !value;

			case 'data-flexible-row':
			{
				selComp.setFlexibleRow(value);
			}
			break;
			
			case 'data-clear-rowtmpl':
			{
				this['data-fullrow-select'].enable(value);
				if(!value)
				{
					selComp.removeAttr('data-fullrow-select');
					this['data-fullrow-select'].setCheck(false);
				}
			}
			break;
		}
	}
	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};

AGridAttrProp.prototype.onStyleFocus = function(comp, info)
{
	var selStyle = comp.getText().trim(), selComp;

	this.saveSelArr = [];

	if(!selStyle) selStyle = 'agrid_select';
	
	for(var i=0; i<this.selCompArr.length; i++)
	{
		selComp = this.selCompArr[i];
		
		selComp.selectStyleName = selStyle;
		selComp.selectCell(selComp.getRow(0));
		
		this.saveSelArr[i] = selComp;
	}
};

AGridAttrProp.prototype.onStyleBlur = function(comp, info)
{
	for(var i=0; i<this.saveSelArr.length; i++)
	{
		this.saveSelArr[i].clearSelected();
	}
};






APivotGridAttrProp = class APivotGridAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
	
	

    }
}



APivotGridAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	this.acc.insertItem('Option', this.attrPath+'Option.lay');
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

};

APivotGridAttrProp.prototype.getUpdateValue = function(selComp, dataKey, groupName)
{
	//단일 선택인 경우만 값을 읽어와 셋팅한다. 다중 선택인 경우는 값을 클리어 해준다.
	if(this.selCompArr.length==1)
	{
		if(groupName=='ATTR_VALUE')
		{
			switch(dataKey)
			{
				case 'data-hide-footer':
					return selComp.scrollGrid.getAttr(dataKey);
					
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
						selComp.scrollGrid.removeAttr(dataKey);
						selComp.pivotGrid.removeAttr(dataKey);
					}
				}
				break;
			}
		}
	}

	return BaseProp.prototype.getUpdateValue.call(this, selComp, dataKey, groupName);	
};

APivotGridAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	var prevVal, view, pivotGrid;
	if(valGroup=='ATTR_VALUE')
	{
		switch(dataKey)
		{
			case 'data-hide-header':
			case 'data-hide-footer':
			{
				var funcTxt = dataKey.split('-')[2];
				funcTxt = funcTxt.substring(0, 1).toUpperCase() + funcTxt.substring(1);
				if(value)
				{
					selComp['hide' + funcTxt]();
					selComp.scrollGrid.setAttr(dataKey, value);
					selComp.pivotGrid.setAttr(dataKey, value);
				}
				else
				{
					selComp['show' + funcTxt]();
					selComp.scrollGrid.removeAttr(dataKey);
					selComp.pivotGrid.removeAttr(dataKey);
				}
				selComp.scrollGrid.setOption({isHideFooter:value});
				selComp.pivotGrid.setOption({isHideFooter:value});
			}
			break;
			
			case 'data-selectable':
			case 'data-width-changable':
			{
				if(value) 
				{
					selComp.scrollGrid.setAttr(dataKey, value);
					selComp.pivotGrid.setAttr(dataKey, value);
				}
				else 
				{
					selComp.scrollGrid.removeAttr(dataKey);
					selComp.pivotGrid.removeAttr(dataKey);
				}
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

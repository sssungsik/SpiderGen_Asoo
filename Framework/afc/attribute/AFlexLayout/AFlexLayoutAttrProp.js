
AFlexLayoutAttrProp = class AFlexLayoutAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		//TODO:edit here
		this.attrPath = BaseProp.ATTR_PATH + 'AFlexLayout/';
	
		this.ieFlexKey = 
		{
			'flex-direction': '-ms-flex-direction',
			'flex-wrap': '-ms-flex-wrap',
			'justify-content': '-ms-flex-pack',
			'align-items': '-ms-flex-align',
			'align-content': '-ms-flex-line-pack'
		};
		
		this.isIESet = false;

    }
}

AFlexLayoutAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	//TODO:edit here
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	this.insertCommonAttr();
};

/*
AFlexLayoutAttrProp.prototype.onInitDone = function()
{
    let sel = this.findCompById('align-items')
    if(sel) sel.selectItem(1)

    sel = this.findCompById('align-content')
    if(sel) sel.selectItem(1)
    
};
*/

/*
function AFlexLayoutAttrProp*getUpdateValue(selComp, dataKey, groupName)
{
	if(groupName=='CSS_VALUE')
	{
		var ieKey = this.ieFlexKey[dataKey];
		if(ieKey) dataKey = ieKey;
	}

	return super.getUpdateValue(selComp, dataKey, groupName);	
};
*/
/*
function AFlexLayoutAttrProp*applyValueToSelComp(selComp, dataKey, valGroup, value)
{
	if(valGroup=='CSS_VALUE')
	{
console.log(2);
		if(this.isIESet) 
		{
console.log(dataKey);		
			dataKey = this.ieFlexKey[dataKey];
console.log(dataKey);					
		}
	}
	
	return super.applyValueToSelComp(selComp, dataKey, valGroup, value);
};

//selectBox value changed
function AFlexLayoutAttrProp*onSelectValueChange(comp, info)
{
	this.applyValue(comp, info);

	var dataKey = comp.getComponentId();
	
	var ieKey = this.ieFlexKey[dataKey];
	if(ieKey)
	{
console.log(1);	
		this.isIESet = true;
		this.applyValue(comp, info);
console.log(1);		
		this.isIESet = false;
	}

};
*/










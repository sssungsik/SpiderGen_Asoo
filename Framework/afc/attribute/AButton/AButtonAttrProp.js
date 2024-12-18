
/**
Constructor
Do not call Function in Constructor.
*/
AButtonAttrProp = class AButtonAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AButton/';
		
		//this.saveSelArr = null;
	
	

    }
}



AButtonAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');
	this.acc.insertItem('Option', this.attrPath+'Option.lay');
	//this.acc.insertItem('Style', this.attrPath+'Style.lay');

	//common
	this.insertCommonAttr();
};


AButtonAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	if(valGroup=='ATTR_VALUE')
	{
		/*
		//버튼에 스타일을 적용하지 않기 위해...이름을 data-style- 로 시작하는 바람에 예외를 둬야 함.
		if(dataKey=='data-style-over' || dataKey=='data-style-down' || dataKey=='data-style-disable')
		{
			var prevVal = selComp.$ele.attr(dataKey);
		
			if(value) selComp.$ele.attr(dataKey, value);
			else selComp.$ele.removeAttr(dataKey);
			
			return prevVal;
		}
		
		else */
		
		if(dataKey=='data-aftertext')
		{
			var url = selComp.getImage();
			selComp.setOption({imgAfterText: value});
			selComp.setImage(url);
		}
		
		else if(dataKey=='data-newline')
		{
			var url = selComp.getImage();
			//selComp.isNewLine = value;
			selComp.setOption({imgNewLine: value});
			selComp.setImage(url);
		}
		
		else if(dataKey=='data-off-downstate')
		{
			selComp.setOption({autoDownState: !value});
		}

	}
	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};

/*
function AButtonAttrProp*onStyleFocus(comp, info)
{
	this.saveValue = comp.getText().trim();
	
	if(!this.saveValue) return;
	
	this.saveSelArr = [];
	
	for(var i=0; i<this.selCompArr.length; i++)
	{
		this.selCompArr[i].addClass(this.saveValue);
		this.saveSelArr[i] = this.selCompArr[i];
	}
};

function AButtonAttrProp*onStyleBlur(comp, info)
{
	if(!this.saveValue) return;
	
	for(var i=0; i<this.saveSelArr.length; i++)
	{
		this.saveSelArr[i].removeClass(this.saveValue);
	}
};
*/

/*
AButtonAttrProp.prototype.onTextValueChange = function(comp, info)
{
	var compId = comp.getComponentId();
	
	if(compId=='Text')
	{
		this.applyValue(comp, info);
		
		var view = theApp.getLayoutView();
		
		if(view)
		{
			var selComp, compId, groupName;
			for(var i=0; i<this.selCompArr.length; i++)
			{
				selComp = this.selCompArr[i];
				compId = selComp.getComponentId();
				
				if(!compId) 
				{
					compId = selComp.getAttr(iWin.afc.ATTR_CLASS) + ' "' + selComp.getText() + '"';
					
					groupName = selComp.getGroupName();
					if(groupName) compId += ' : ' + groupName;
				
					view.getDocument().treeRename(selComp, compId);
				}
			}
		}
		return;
	}
	
	BaseProp.prototype.onTextValueChange.call(this, comp, info);
};
*/
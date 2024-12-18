
/**
Constructor
Do not call Function in Constructor.
*/
AViewAttrProp = class AViewAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AView/';
	
	

    }
}



AViewAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	//this.insertCommonAttr();
};

AViewAttrProp.prototype.getUpdateValue = function(selComp, dataKey, groupName)
{
	if(groupName=='ATTR_VALUE')
	{
		if(dataKey=='data-load-url')
		{
			var url = selComp.$ele.attr(dataKey);
			
			if(url) this.testLoadView(selComp.$ele, url);
		}
	}

	return BaseProp.prototype.getUpdateValue.call(this, selComp, dataKey, groupName);	
};

AViewAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	var prevVal;
	if(valGroup=='ATTR_VALUE')
	{
		switch(dataKey)
		{
			case 'data-arrange':
			{
				prevVal = selComp.$ele.attr(dataKey);
				
				if(value=='none') 
				{
					selComp.$ele.children().css({'position':'absolute', 'float':'none', 'margin':''});
					selComp.$ele.removeAttr('data-arrange');
					selComp.$ele.css('padding', '');
				}

				//float left, right 
				else 
				{
					//무조건 아래 설정을 유지해야 함. 다른 옵션은 안됨.
					selComp.$ele.children().css({'position':'relative', left:'0px', top:'0px', 'float':value});
					selComp.$ele.attr(dataKey, value);
				}
			}
			return prevVal;
			
			case 'data-load-url':
			{
				this.testLoadView(selComp.$ele, value);
			}
			break;
		}
	}
	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};


AViewAttrProp.prototype.testLoadView = function($ele, url)
{
	var prjView = theApp.getProjectView(),
		item = prjView.findProjectItemByTreePath(url);
		
	$ele.find('.test-view').remove();

	if(item)
	{
		url = prjView.getFullPath(item);
		
		if(url)
		{
			if(AUtil_.extractExtName(url) != 'lay') return;

			var html = afc_.getFileSrc(url);
			if(html)
			{
				// Button 에 Icon을 등록한 경우
				// <img src="relUrl"> -> <img src="absUrl">
				// background-image: url("relUrl") -> background-image: url("absUrl")
				if(theApp.resMap && theApp.resMap.replaceRelToAbs)
				{
					html = theApp.resMap.replaceRelToAbs('src="', '"', html);
					html = theApp.resMap.replaceRelToAbs('url(', ')', html, 2);
				}
				
				$ele.append('<div class="test-view">' + html + '</div>');

				var child = $ele.children();
				child.find('.RGrid-Style').removeAttr('id').css('border', '1px solid blue').text('rMate Grid').css('text-align','center');
				child.find('.RChart-Style').removeAttr('id').css('border', '1px solid yellow').text('rMate Chart').css('text-align','center');
				child.css({
					position: 'relative',
					width: '100%',
					height: '100%'
				});
			}
		}
	}
};









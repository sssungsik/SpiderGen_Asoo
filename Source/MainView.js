
MainView = class MainView extends AView
{
	constructor()
	{
		super()

		//TODO:edit here

	}

	init(context, evtListener)
	{
		super.init(context, evtListener)

		//TODO:edit here

	}

	onInitDone()
	{
		super.onInitDone()

		//TODO:edit here
        this.mainTabView.addTab( 'tab1', 'Source/items/main.lay', 'tab1');
        this.mainTabView.addTab( 'tab2', 'Source/items/docu.lay', 'tab2');
        this.mainTabView.addTab( 'tab3', 'Source/items/commu.lay', 'tab3');
       

       this.mainTabView.selectTabById('tab1');
      

     

	}

	onActiveDone(isFirst)
	{
		super.onActiveDone(isFirst)

		//TODO:edit here
       
	}


	homeBtn(comp, info, e)
	{

		//TODO:edit here
        this.mainTabView.selectTabById('tab1');
       
	}

	docBtn(comp, info, e)
	{

		//TODO:edit here
        this.mainTabView.selectTabById('tab2');
     
	}

	commBtn(comp, info, e)
	{

		//TODO:edit here
         this.mainTabView.selectTabById('tab3');

	}
}


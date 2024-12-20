
main = class main extends AView
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

        window.section4_slide = this.section4_slide;

        this.section4_slide.addItem('Source/slides/MainSlide1.lay', [1]);
        this.section4_slide.addItem('Source/slides/MainSlide2.lay', [2]);
        this.section4_slide.addItem('Source/slides/MainSlide3.lay', [3]);

        
         

        
	}

	onActiveDone(isFirst)
	{
		super.onActiveDone(isFirst)

		//TODO:edit here

	}


	onAButton1Click(comp, info, e)
	{

		//TODO:edit here
        this.section4_slide.slidePrev();

	}

	onAButton2Click(comp, info, e)
	{

		//TODO:edit here
        this.section4_slide.slideNext();

	}
}


class TextBox
{
    constructor(props)
    {
        this.position = createVector(props.x * scale.x, props.y * scale.y);
        this.x = props.x * scale.x;
        this.y = props.y * scale.y;
        this.id = props.id;
        this.text = props.text;

        this.font = props.font || null;
        this.fontSize = props.fontSize * scale.x || null;
        this.color = props.color || null;
        this.size = props.size || null;
        this.align = props.align || CENTER;

        this.class = props.class || null; 
        if (this.class != null) 
        {
            this.font = this.class.hasOwnProperty("font") ? props.class.font : props.font;
            this.fontSize = this.class.hasOwnProperty("fontSize") ? props.class.fontSize * scale.x : props.fontSize * scale.x;
            this.color = this.class.hasOwnProperty("color") ? props.class.color : props.color;
            this.size = this.class.hasOwnProperty("size") ? props.class.size : props.size;
            this.align = this.class.hasOwnProperty("align") ? props.class.align : props.align || LEFT;
        }

        this.size = this.size != null ? createVector(this.size.x * scale.x, this.size.y * scale.x) : null
    }

    display()
    {
        let textBox = this;
        if (textBox.visibility != "hidden")
        {
            push()
            
            
                noStroke()
                fill(textBox.color)
                textSize(textBox.fontSize)
                textFont(textBox.font)
                textAlign(textBox.align);
                if (textBox.size != null) 
                {
                    text(textBox.text, textBox.x,  textBox.y, textBox.size.x,  textBox.size.y);   
                }
                else
                {
                    text(textBox.text, textBox.x,  textBox.y);   
                }

                
                
                

            pop() 
        }
                    
    }
  
}

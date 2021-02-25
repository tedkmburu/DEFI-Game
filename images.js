class MyImage
{
    constructor(props)
    {
        this.position = createVector(props.x * scale.x, props.y * scale.y);
        this.x = props.x * scale.x;
        this.y = props.y * scale.y;

        this.size = props.size || null;

        this.class = props.class || null; 
        if (this.class != null) 
        {
            this.size = this.class.hasOwnProperty("size") ? props.class.size : props.size;
        }
        this.size = this.size != null ? createVector(this.size.x * scale.x, this.size.y * scale.x) : null
    }

    display()
    {
        let textBox = this;
        if (textBox.visibility != "hidden")
        {
            push()
            
            
                // if (textBox.size != null) 
                // {
                //     text(textBox.text, textBox.x,  textBox.y, textBox.size.x,  textBox.size.y);   
                // }
                // else
                // {
                //     text(textBox.text, textBox.x,  textBox.y);   
                // }

                
                
                

            pop() 
        }
                    
    }
  
}

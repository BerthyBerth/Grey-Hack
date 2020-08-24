encrypt = function(value)
	
	amountBlocks = floor(value.len / 2)
	
	clockBlock = 0
	currentCharIndex = 1
	currentBlockValue = 0
    hashedValue = ""
	for i in value

        clockBlock = clockBlock + 1
        //print("Unicode : " + i.code)
		
		if clockBlock >= 3 then
			
			if (value % 2) != 0 and currentCharIndex == value.len then
				currentBlockValue = currentBlockValue + i.code
                hashedValue = hashedValue + str(currentBlockValue)
                //print("Current Block : " + currentBlockValue)
			else
                clockBlock = 1
                hashedValue = hashedValue + str(currentBlockValue)
                currentBlockValue = i.code
                //print("Current Block : " + currentBlockValue)
			end if
		else

            currentBlockValue = currentBlockValue + i.code
            //print("Current Block : " + currentBlockValue)

            if currentCharIndex == value.len then

                hashedValue = hashedValue + currentBlockValue

            end if

		end if
        //print("Clock : " + clockBlock)
		
        //print("Final Value : " + hashedValue)
        currentCharIndex = currentCharIndex + 1
	    //print("<b>====================</b>")
    end for
	
	return hashedValue

end function

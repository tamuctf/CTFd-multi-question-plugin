# CTFd-multi-question-plugin

CTFd plugin that creates a new challenge type that requires multiple questions to be answered before the challenge is solved.  

## Installation
Clone this repositor into `CTFd/plugins`.

## Usage
1. Create challenge and select `multiquestionchallenge`
2. Enter in info for Name, Category, Message, and Value
3. For each Flag:
    - Enter Key Name in input box labeled `Enter Key Name`. This will show up as the help text for the Key entry box.
    - Enter Key Solution in the input box labeled `Enter Key Solution`. This will be the key/flag for this key name.
    - Select the key type for this specific key/flag
4. Click `Add New Question` to add a new key/flag
5. Click `Create`

## Examples
### Creating Question
![create](https://github.com/tamuctf/CTFd-multi-question-plugin/blob/master/pics/multiquestioncreate.png)

### Question View
![view](https://github.com/tamuctf/CTFd-multi-question-plugin/blob/master/pics/multiquestionview.png)

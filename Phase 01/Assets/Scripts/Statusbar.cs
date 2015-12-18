using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Statusbar : MonoBehaviour {
    public Text statusText;
    private AbstractTouchListener currentListner = null;
    private UndoStack undoStack;
    private const string defaultName = "Welcome";
    private void updateText(string newText){
        statusText.text = newText;
    }
	// Use this for initialization
	void Start () {
       undoStack = UndoStack.instance;
	}
	
	// Update is called once per frame
	void Update () {
       AbstractTouchListener newCurrent = undoStack.getCurrentStatus();
        if (newCurrent != null)
        {
            currentListner = newCurrent;
            updateText(currentListner.getNextSceneName());
        }
        else{
            updateText(defaultName);
        }
  
	}
}

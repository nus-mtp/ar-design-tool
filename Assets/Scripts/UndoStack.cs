using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class UndoStack : MonoBehaviour {
    private static readonly UndoStack theOne = new UndoStack();
    private static Stack<AbstractTouchListener> undoStack  = new Stack<AbstractTouchListener>();
    
    public static UndoStack getInstance()
    {
        return theOne;
    }

    private UndoStack()
    {
        
    }

    public void addToUndo(AbstractTouchListener tl){
        Debug.Log("Added to undostack:" + tl);
        undoStack.Push(tl);
        Debug.Log("Current items in undostack");
        foreach (AbstractTouchListener a in undoStack)
        {
            Debug.Log(a);
        }
        Debug.Log("End of List");
    }

    public void undoAction()
    {
        if (undoStack.Count > 0 && TouchController.objectIsFound)
        {
            AbstractTouchListener tl = undoStack.Pop();
            Debug.Log("Popped:" + tl);
            tl.undo();
        }
        else
        {
            Debug.Log("UndoStack is empty");
        }
    }
	// Use this for initialization
	void Start () {
        getInstance();
	}
	
	// Update is called once per frame
	void Update () {
      
	}
}

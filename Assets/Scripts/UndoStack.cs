using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class UndoStack : MonoBehaviour {
    private static UndoStack theOne = null;
    private static Stack<AbstractTouchListener> undoStack;
    
    public static UndoStack getInstance()
    {
        if (theOne == null)
        {
            theOne = new UndoStack();
        }
        return theOne;
    }

    private UndoStack()
    {
        undoStack = new Stack<AbstractTouchListener>();
    }

    public void addToUndo(AbstractTouchListener tl){
        Debug.Log("Added to undostack:" + tl);
        undoStack.Push(tl);

    }

    public void undoAction()
    {
        if (undoStack.Count > 0)
        {
            AbstractTouchListener tl = undoStack.Pop();
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

using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class UndoStack : MonoBehaviour {
    private static UndoStack theOne;
    public static UndoStack instance
    {
        get
        {
            if (theOne == null)
            {
                GameObject go = new GameObject("UndoStack");
                go.AddComponent<UndoStack>();
            }

            return theOne;
        }
    }

    private Stack<AbstractTouchListener> undoStack{get;set;}

    //private onstructor
    private UndoStack() { }
  
    public void addToUndo(AbstractTouchListener tl)
    {
        undoStack.Push(tl);

    }
    public AbstractTouchListener getCurrentStatus()
    {
        if (undoStack.Count > 0)
        {
            AbstractTouchListener current = undoStack.Peek();
            return current;

        }
        return null;
    }

    public void undoAction()
    {
        if(undoStack.Count > 0 ){
            if (TouchController.objectIsFound)
            {
                AbstractTouchListener tl = undoStack.Pop();
                tl.undo();
            }
            else if (undoStack.Peek().GetType() == typeof(IndividualIngredientTouchListener))
            {
                AbstractTouchListener tl = undoStack.Pop();
                tl.undo();
            }
        }
    }

    void Awake()
    {
        theOne = this;
    }

	// Use this for initialization
	void Start () {
       undoStack = new Stack<AbstractTouchListener>();
	}
	
	// Update is called once per frame
	void Update () {
        if (Input.GetKeyUp(KeyCode.Escape))
        {
            // back button pressed
            undoAction();
        }
    }
}

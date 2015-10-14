using UnityEngine;

public abstract class AbstractTouchListener : MonoBehaviour {

    abstract public void touchHandler();
    abstract public void undo();
    protected void addToUndo()
    {
        UndoStack undoStack = UndoStack.getInstance();
        undoStack.addToUndo(this);
    }
}

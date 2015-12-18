using UnityEngine;

public abstract class AbstractTouchListener : MonoBehaviour {

    abstract public void touchHandler();
    abstract public void undo();
    abstract public string getNextSceneName();
    protected void addToUndo()
    {
        UndoStack undoStack = UndoStack.instance;
        undoStack.addToUndo(this);
    }
}

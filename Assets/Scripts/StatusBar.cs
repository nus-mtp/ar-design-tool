using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class StatusBar : MonoBehaviour {
    public Text statusBar;
    private UndoStack undostack;
	// Use this for initialization
	void Start () {
        undostack = UndoStack.getInstance();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}

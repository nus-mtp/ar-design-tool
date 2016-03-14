using UnityEngine;
using System.Collections;

public class Mouse : MonoBehaviour {
    
    public static Vector3 mousePosition;
    public static bool isMouseDown;
    public static bool isMouseUp;
    public static bool isClick;

    // Use this for initialization
    void Start () {
        isMouseDown = false;
        isMouseUp = true;
        isClick = false;
        mousePosition = Input.mousePosition;
        Debug.Log("Mouse is initialised");
    }
	
	// Update is called once per frame
	void Update ()
    {
        isClick = Input.GetMouseButtonDown(0);
        if (Input.GetMouseButtonDown(0))
        {
            isMouseDown = true;
            isMouseUp = false;
        }
        if (Input.GetMouseButtonUp(0))
        {
            isMouseDown = false;
            isMouseUp = true;
        }
        mousePosition = Input.mousePosition;
    }
}

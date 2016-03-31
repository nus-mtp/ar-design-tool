using UnityEngine;
using System.Collections;

public class DragHandler : MonoBehaviour
{
    private GameObject chosenObj;
    private Vector3 mouseOrigin;

	// Use this for initialization
	void Start ()
    {
        chosenObj = null;
        mouseOrigin = Mouse.mousePosition;
    }
	
	// Update is called once per frame
	void Update ()
    {
        RaycastHit hit;
        Ray ray = Camera.main.ScreenPointToRay(Mouse.mousePosition);

        if (Mouse.isClick)
        {
            if (Physics.Raycast(ray, out hit))
            {
                if (hit.collider)
                {
                    chosenObj = hit.collider.gameObject;
                }
            }
        }
        if (Mouse.isMouseDown && chosenObj)
        {
            AbstractTransformHandler interactable = chosenObj.GetComponent<AbstractTransformHandler>();
            if (interactable)
            {
                interactable.onDrag(mouseOrigin, Mouse.mousePosition);
            }
        }
        else
        {
            chosenObj = null;
        }
        mouseOrigin = Mouse.mousePosition;
	}
}

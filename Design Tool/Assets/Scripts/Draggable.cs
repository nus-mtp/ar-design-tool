using UnityEngine;
using UnityEngine.EventSystems;
using System.Collections;

[RequireComponent(typeof(MeshCollider))]

public class Draggable : MonoBehaviour
{

    private Vector3 screenPoint;
    private Vector3 offset;
    private ObjectCollection objectCollection;

    void OnMouseDown()
    {
        if (EventSystem.current.IsPointerOverGameObject() == false)
        {
            objectCollection.SetActiveGameObject(gameObject);
            screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);

            offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
        }

    }

    void OnMouseDrag()
    {
        if (EventSystem.current.IsPointerOverGameObject() == false)
        {
            Vector3 curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
            Vector3 curPosition = Camera.main.ScreenToWorldPoint(curScreenPoint) + offset;
            transform.position = curPosition;

        }

    }

    void Awake()
    {
        GameObject controlScripts = GameObject.FindGameObjectWithTag("ControlScripts");
        objectCollection = controlScripts.GetComponent<ObjectCollection>();
    }
}


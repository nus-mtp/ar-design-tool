using UnityEngine;
using System.Collections;

public class CameraControl : MonoBehaviour
{
    bool rotateLeft = false;
    bool rotateRight = false;
    bool zoomIn = false;
    bool zoomOut = false;

    float rotationSpeed = 80;
    float zoomInSpeed = 80;
    Vector3 zoomVector;
    // Use this for initialization
    void Start()
    {

        transform.LookAt(Vector3.zero);
    }

    void Update()
    {

        if (Input.GetKeyDown(KeyCode.LeftArrow))
        {
            rotateLeft = true;
        }

        if (Input.GetKeyUp(KeyCode.LeftArrow))
        {
            rotateLeft = false;
        }

        if (Input.GetKeyDown(KeyCode.RightArrow))
        {
            rotateRight = true;
        }

        if (Input.GetKeyUp(KeyCode.RightArrow))
        {
            rotateRight = false;
        }

        if (Input.GetKeyDown(KeyCode.UpArrow))
        {
            zoomIn = true;
        }

        if (Input.GetKeyUp(KeyCode.UpArrow))
        {
            zoomIn = false;
        }

        if (Input.GetKeyDown(KeyCode.DownArrow))
        {
            zoomOut = true;
        }

        if (Input.GetKeyUp(KeyCode.DownArrow))
        {
            zoomOut = false;
        }

        if (rotateLeft)
        {
            transform.RotateAround(Vector3.zero, Vector3.up, -rotationSpeed * Time.deltaTime);
        }

        if (rotateRight)
        {
            transform.RotateAround(Vector3.zero, Vector3.up, rotationSpeed * Time.deltaTime);
        }

        if (zoomIn)
        {
            if (Vector3.Magnitude(transform.position) > 3)
            {
                transform.position = Vector3.MoveTowards(transform.position, Vector3.zero, zoomInSpeed * Time.deltaTime);
            }
        }

        if (zoomOut)
        {
            transform.position = Vector3.MoveTowards(transform.position, Vector3.zero, -zoomInSpeed * Time.deltaTime);
        }

        
    }

}
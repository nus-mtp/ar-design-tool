using UnityEngine;
using System.Collections;

public class Transformation : MonoBehaviour
{

    public float scalingSpeed = 0.3f;
    public float rotationSpeed = 70.0f;
    public float translationSpeed = 50.0f;
    public GameObject transformationTarget;
    public StateManager stateManager;
    bool repeatScaleUp = false;
    bool repeatScaleDown = false;
    bool repeatRotateRight = false;
    bool repeatRotateLeft = false;
    bool repeatRotateUp = false;
    bool repeatRotateDown = false;
    bool repeatRotateOut = false;
    bool repeatRotateIn = false;
    bool repeatPositionUp = false;
    bool repeatPositionDown = false;
    bool repeatPositionLeft = false;
    bool repeatPositionRight = false;
    bool repeatPositionIn = false;
    bool repeatPositionOut = false;

    // Update is called once per frame
    void Update()
    {
        transformationTarget = stateManager.GetActiveGameObject();

        if (repeatScaleUp)
        {
            ScaleUpButton();
        }

        if (repeatScaleDown)
        {
            ScaleDownButton();
        }

        if (repeatRotateRight)
        {
            RotationRightButton();
        }

        if (repeatRotateLeft)
        {
            RotationLeftButton();
        }

        if (repeatRotateUp)
        {
            RotationUpButton();
        }

        if (repeatRotateDown)
        {
            RotationDownButton();
        }

        if (repeatRotateOut)
        {
            RotationOutButton();
        }

        if (repeatRotateIn)
        {
            RotationInButton();
        }

        if (repeatPositionUp)
        {
            PositionUpButton();
        }

        if (repeatPositionDown)
        {
            PositionDownButton();
        }

        if (repeatPositionLeft)
        {
            PositionLeftButton();
        }

        if (repeatPositionRight)
        {
            PositionRightButton();
        }

        if (repeatPositionIn)
        {
            PositionInButton();
        }

        if (repeatPositionOut)
        {
            PositionOutButton();
        }
    }

    public void RotationRightButton()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        transformationTarget.transform.Rotate(0, 0, rotationSpeed * Time.deltaTime);
    }

    public void RotationLeftButton()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        transformationTarget.transform.Rotate(0, 0, -rotationSpeed * Time.deltaTime);
    }

    public void RotationUpButton()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        transformationTarget.transform.Rotate(rotationSpeed * Time.deltaTime, 0, 0);
    }

    public void RotationDownButton()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        transformationTarget.transform.Rotate(-rotationSpeed * Time.deltaTime, 0, 0);
    }


    public void RotationOutButton()
    {
        // transform.Rotate (0, -rotationSpeed * Time.deltaTime, 0);
        transformationTarget.transform.Rotate(0, rotationSpeed * Time.deltaTime, 0);
    }

    public void RotationInButton()
    {
        // transform.Rotate (0, -rotationSpeed * Time.deltaTime, 0);
        transformationTarget.transform.Rotate(0, -rotationSpeed * Time.deltaTime, 0);
    }


    public void RotationRightButtonRepeat()
    {
        // transform.Rotate (0, -rotationSpeed * Time.deltaTime, 0);
        repeatRotateRight = true;
    }

    public void RotationUpButtonRepeat()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        repeatRotateUp = true;
    }

    public void RotationOutButtonRepeat()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        repeatRotateOut = true;
    }

    public void RotationLeftButtonRepeat()
    {
        // transform.Rotate (0, -rotationSpeed * Time.deltaTime, 0);
        repeatRotateLeft = true;
    }

    public void RotationDownButtonRepeat()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        repeatRotateDown = true;
    }

    public void RotationInButtonRepeat()
    {
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        repeatRotateIn = true;
    }



    public void ScaleUpButton()
    {
        // transform.localScale += new Vector3(scalingSpeed, scalingSpeed, scalingSpeed);
        transformationTarget.transform.localScale += new Vector3(scalingSpeed, scalingSpeed, scalingSpeed);
    }

    public void ScaleUpButtonRepeat()
    {
        repeatScaleUp = true;
    }
    public void ScaleDownButtonRepeat()
    {
        repeatScaleDown = true;
    }
    public void PositionDownButtonRepeat()
    {
        repeatPositionDown = true;
    }
    public void PositionUpButtonRepeat()
    {
        repeatPositionUp = true;
    }
    public void PositionLeftButtonRepeat()
    {
        repeatPositionLeft = true;
    }
    public void PositionRightButtonRepeat()
    {
        repeatPositionRight = true;
    }

    public void PositionInButtonRepeat()
    {
        repeatPositionIn = true;
    }

    public void PositionOutButtonRepeat()
    {
        repeatPositionOut = true;
    }

    public void ScaleUpButtonOff()
    {
        repeatScaleUp = false;
    }
    public void ScaleDownButtonOff()
    {
        repeatScaleDown = false;
    }

    public void RotateRightButtonOff()
    {
        repeatRotateRight = false;
    }

    public void RotateLeftButtonOff()
    {
        repeatRotateLeft = false;
    }

    public void RotateUpButtonOff()
    {
        repeatRotateUp = false;
    }

    public void RotateDownButtonOff()
    {
        repeatRotateDown = false;
    }

    public void RotateOutButtonOff()
    {
        repeatRotateOut = false;
    }

    public void RotateInButtonOff()
    {
        repeatRotateIn = false;
    }

    public void PositionRightButtonOff()
    {
        repeatPositionRight = false;
    }
    public void PositionLeftButtonOff()
    {
        repeatPositionLeft = false;
    }
    public void PositionUpButtonOff()
    {
        repeatPositionUp = false;
    }
    public void PositionDownButtonOff()
    {
        repeatPositionDown = false;
    }

    public void PositionInButtonOff()
    {
        repeatPositionIn = false;
    }
    public void PositionOutButtonOff()
    {
        repeatPositionOut = false;
    }


    public void ScaleDownButton()
    {
        transformationTarget.transform.localScale += new Vector3(-scalingSpeed, -scalingSpeed, -scalingSpeed);
    }

    public void PositionUpButton()
    {
        transformationTarget.transform.Translate(0, translationSpeed * Time.deltaTime, 0, Space.Self);
    }

    public void PositionDownButton()
    {

        transformationTarget.transform.Translate(0, -translationSpeed * Time.deltaTime, 0, Space.World);
    }

    public void PositionRightButton()
    {
        transformationTarget.transform.Translate(translationSpeed * Time.deltaTime, 0, 0, Space.World);
    }

    public void PositionLeftButton()
    {
        transformationTarget.transform.Translate(-translationSpeed * Time.deltaTime, 0, 0, Space.World);  // backward
    }

    public void PositionInButton()
    {
        transformationTarget.transform.Translate(0, 0, -translationSpeed * Time.deltaTime, Space.World); // backward
    }

    public void PositionOutButton()
    {
        transformationTarget.transform.Translate(0, 0, translationSpeed * Time.deltaTime, Space.World);  // backward
    }

    void Awake()
    {
        stateManager = gameObject.GetComponent<StateManager>();
    }

}
